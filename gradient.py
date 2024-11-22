import streamlit as st
import pandas as pd
import xgboost as xgb
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import pickle

# Title and description
st.title("Lead Score Predictor")
st.write("Train the model, save it, and predict lead scores dynamically.")

# Load dataset
st.sidebar.header("Upload Training Dataset")
uploaded_file = st.sidebar.file_uploader("Upload a CSV file", type=["csv"])

if uploaded_file:
    # Load data
    df = pd.read_csv(uploaded_file)
    st.write("Dataset Preview:")
    st.dataframe(df.head())

    # Preprocessing
    st.write("Preprocessing the data...")
    df = df.drop_duplicates().dropna()  # Drop duplicates and rows with missing values

    # Define target and features
    if "Converted" not in df.columns:
        st.error("The dataset must contain a 'Converted' column as the target variable.")
    else:
        X = df.drop(columns=["Converted"])
        y = df["Converted"]

        # One-hot encoding for categorical variables
        X = pd.get_dummies(X, drop_first=True)

        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Standardize numerical features
        scaler = StandardScaler()
        numerical_cols = X_train.select_dtypes(include=["float64", "int64"]).columns
        X_train[numerical_cols] = scaler.fit_transform(X_train[numerical_cols])
        X_test[numerical_cols] = scaler.transform(X_test[numerical_cols])

        # Train XGBoost model
        st.write("Training the XGBoost model...")
        model = xgb.XGBClassifier(
            max_depth=5,
            learning_rate=0.1,
            n_estimators=100,
            objective="binary:logistic",
            random_state=42
        )
        model.fit(X_train, y_train)

        st.success("Model training completed!")

        # Save model, scaler, and feature columns
        st.write("Saving the model and preprocessing artifacts...")
        model.save_model("xgb_model.json")
        with open("scaler.pkl", "wb") as f:
            pickle.dump(scaler, f)
        feature_columns = X.columns.tolist()
        with open("feature_columns.pkl", "wb") as f:
            pickle.dump(feature_columns, f)
        st.success("Model and preprocessing artifacts saved successfully!")

        # Predict on test set
        y_pred = model.predict(X_test)
        lead_scores = model.predict_proba(X_test)[:, 1]  # Probability scores
        st.write("Sample Predictions:")
        st.write(pd.DataFrame({"Lead Score": lead_scores[:10], "Converted (Actual)": y_test[:10].values}))

        # Section for predicting new lead scores
        st.sidebar.header("Predict Lead Score")
        input_data = {}
        for col in feature_columns:
            if col.startswith("Category_"):  # Categorical features
                input_data[col] = st.sidebar.selectbox(
                    f"{col}", ["Option1", "Option2", "Option3"]
                )
            else:  # Numerical features
                input_data[col] = st.sidebar.number_input(f"{col}", value=0.0)

        if st.sidebar.button("Predict Lead Score"):
            input_df = pd.DataFrame([input_data])

            # Align input with feature columns
            missing_cols = set(feature_columns) - set(input_df.columns)
            for col in missing_cols:
                input_df[col] = 0  # Add missing columns with default value 0
            input_df = input_df[feature_columns]  # Reorder to match training columns

            # Scale numerical features
            input_df[numerical_cols] = scaler.transform(input_df[numerical_cols])

            # Predict lead score
            score = model.predict_proba(input_df)[:, 1][0]
            st.sidebar.subheader("Predicted Lead Score")
            st.sidebar.write(f"The predicted lead score is: **{score:.2f}**")
