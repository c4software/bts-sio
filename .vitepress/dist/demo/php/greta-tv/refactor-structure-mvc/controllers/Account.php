<?php


namespace controllers;


use controllers\base\Web;
use models\SampleAccount;
use utils\SessionHelpers;
use utils\Template;

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

        Template::render("views/account/login.php", array());
    }

    function logout()
    {
        SessionHelpers::logout();
        $this->redirect("/login");
    }

    function me()
    {
        Template::render("views/account/me.php", array());
    }
}