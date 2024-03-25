# Python version
FROM python:3.11.4

# Set the working directory in the container
WORKDIR /app

# Define port
ENV PORT 8080

# Copy the requirements file
COPY requirements.txt .

# Upgrade pip
RUN pip install --upgrade pip

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY . .

# Expose the port
EXPOSE 8080

# Command to run on container start
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]