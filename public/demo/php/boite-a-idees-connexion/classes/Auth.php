<?php

class Auth
{
    public static function attempt(string $email, string $password): bool
    {
        $user = User::findByEmail($email);

        if ($user === null) {
            return false;
        }

        if (!password_verify($password, $user->passwordHash)) {
            return false;
        }

        session_regenerate_id(true);
        $_SESSION['user_id'] = $user->id;
        $_SESSION['user_name'] = $user->name;

        return true;
    }

    public static function check(): bool
    {
        return isset($_SESSION['user_id']);
    }

    public static function name(): ?string
    {
        return $_SESSION['user_name'] ?? null;
    }

    public static function logout(): void
    {
        unset($_SESSION['user_id'], $_SESSION['user_name']);
        session_destroy();
    }
}
