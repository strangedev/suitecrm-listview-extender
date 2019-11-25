<?php
require_once('include/MVC/View/views/view.list.php');
class ViewListExtender extends ViewList
{
    /**
     * @see ViewList::preDisplay()
     */
    public function preDisplay()
    {
        parent::preDisplay();
        foreach ($this->loadHooks() as $hookFn) {
            $hookFn($this);
        }
    }
    /**
     * Globs the listview.d directory and loads all hooks defined
     * in it.
     * @return array Of hook functions to be executed on the listview
     */
    protected function loadHooks()
    {
        $module = $_REQUEST['current_module'];
        $hookDir = 'custom/modules/${module}/view.list.d';
        $hooks = array();
        foreach (glob('${hookDir}/*.php') as $file) {
            include_once $file;
        }
        return $hooks;
    }
}