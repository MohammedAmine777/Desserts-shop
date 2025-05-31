<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login&sign.css">
    <title>Log in</title>
</head>
<!-- email: mohammed@gmail.com
password: QQQ@@@aa -->

<?php
session_start();

$conn = new mysqli("localhost", "zoro", "zoro", "auth");

if ($conn->connect_error) {
    die("<script>alert('❌ Connection failed');</script>");
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT * FROM `users` WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $hashed_password = $row["password"];

        if (password_verify($password, $hashed_password)) {
            $_SESSION["user"] = $email;
            echo "<script>
                    alert('✅ Login successful!');
                    window.location.href = 'dashboard.php';
                  </script>";
        } else {
            echo "<script>alert('❌ Wrong password.');</script>";
        }
    } else {
        echo "<script>alert('❌ Email not found.');</script>";
    }

    $stmt->close();
}

$conn->close();
?>


<body>

    <form action="#" method="post">
        <div class="card">
            <h1>Log in</h1>

            <div class="items">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" required>
                </div>

                
            </div>

            <div class="button-c">
                <button type="submit">log in</button>
            </div>
        </div>
    </form>

    <script src="script.js"></script>
</body>
</html>
