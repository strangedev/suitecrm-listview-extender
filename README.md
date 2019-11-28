# suitecrm-listview-extender (wip)

Allows multiple list view extensions to work simultaneously

## What is the purpose of this plugin?

Usually, only one custom list view implementation may exists
for each module, since customizations are loaded from a single file
per module. This plugin circumvents this problem by providing a
hook mechanism that may be used by plugin vendors to hook into
the ViewList's `preDisplay()` method. The hooks may alter the
list view before it is rendered to add custom buttons,
change sort order, etc.

## How do I use this plugin?

Instead of copying your custom ViewList implementation into
`custom/modules/<module>/views/view.list.php`, you create a new
file containing your hook inside `custom/modules/<module>/views/view.list.d/`.
In this file, you register the hook by returning it:

```php
<?php

return function ($view) { ... }
```

Your hook function receives the ViewList instance as a parameter,
you may apply your modifications to the view here, for example
(thanks to [@pgorod](https://gist.github.com/pgorod/5de7c6f8d37413654b16e06668d7e1b1)):

```php
<?php

return function ($view) {
    global $app_strings;
    $view->lv->actionsMenuExtraItems[] = <<<EOF
<a class="menuItem" style="width: 150px;" href="#" onmouseover='hiliteItem(this,"yes");'
    onmouseout='unhiliteItem(this);'
    onclick="sugarListView.get_checks();
    if(sugarListView.get_checks_count() &lt; 1) {
        alert('{$app_strings['LBL_LISTVIEW_NO_SELECTED']}');
        return false;
    }
    document.MassUpdate.action.value='displaypassedids';
    document.MassUpdate.submit();">Send records to a new view!</a>;
EOF;
}
```

The example adds a custom button to the list view.
