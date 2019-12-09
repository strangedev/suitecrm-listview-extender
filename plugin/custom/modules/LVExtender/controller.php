<?php
if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');


class LVExtenderController extends SugarController
{
    public function action_debugger() {
        global $current_user;
        if(!$current_user->isAdmin()) {
            ACLController::displayNoAccess();
            sugar_die('');
        }
        $this->view = 'debugger';
    }
}
