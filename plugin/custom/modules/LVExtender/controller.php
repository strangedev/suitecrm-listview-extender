<?php
if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');

global $current_user;
if($current_user->isAdmin() == 1) {
    ACLController::displayNoAccess();
    sugar_die('');
}

class LVExtenderAdminController extends SugarController
{

    public function action_debugger() {
        $this->view = 'debugger';
        header('Location: index.php?module=Administration&action=index');
    }
}
