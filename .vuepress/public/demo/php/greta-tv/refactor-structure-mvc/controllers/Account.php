<?php


namespace controllers;


use controllers\base\Web;
use models\SampleAccount;
use utils\SessionHelpers;

class Account extends Web
{
    protected $account;

    public function __construct()
    {
        $this->account = new SampleAccount();
    }

    function login()
    {
        if (isset($_POST['login']) && isset($_POST['password'])) {
            if ($this->account->login($_POST["login"], $_POST["password"])) {
                $this->redirect("me");
            }
        }

        $this->header();
        include("views/account/login.php");
        $this->footer();
    }

    function logout()
    {
        SessionHelpers::logout();
        $this->redirect("/login");
    }

    function me()
    {
        $this->header();
        include("views/account/me.php");
        $this->footer();
    }
}