<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login&sign.css">
    <title>Sign Up</title>
</head>

<?php
$conn = new mysqli("localhost", "zoro", "zoro", "auth");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = htmlspecialchars($_POST["email"]);
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];
    
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        echo "❌invalid email ";
        return;
    };
    $characters = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8}$/";
    if(preg_match($characters, $password)) {
        echo "Valid password";
    }else{
        echo "❌Invalid password.";
    };

    if ($password !== $confirm_password) {
        echo "<script>alert('❌ Passwords do not match.');</script>";
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO `users` (`email`, `password`) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $hashed_password);

        if ($stmt->execute()) {
            echo "<script>alert('✅ Registration successful!');
            window.location.href = 'login.php'
            </script>";
        } else {
            echo "<script>alert('❌ Email is already registered.');</script>";
        }

        $stmt->close(); 
    }
}

$conn->close();
?>

<body>

    <form action="#" method="post">
        <div class="card">
            <h1>Sign Up</h1>

            <div class="items">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" required>
                </div>
                <div class="form-group">
                    <label for="confirm_password">Confirm Password:</label>
                    <input type="password" name="confirm_password" id="confirm_password" required>
                </div>
            </div>

            <div class="button-c">
                <button type="submit">Apply</button>
            </div>
        </div>
    </form>

    <script src="script.js"></script>
</body>
</html>
