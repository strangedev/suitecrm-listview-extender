<h2>{$MOD.LBL_LV_SECTION_HEADER} - {$MOD.LBL_LV_DEBUGGER}</h2>
{if $LV_HOOKCNT gt 0}
    <p>
        There are {$LV_HOOKCNT} hooks installed.
    </p>
{else}
    <p>
        There are no hooks installed.
        See the <a href="https://github.com/strangedev/suitecrm-listview-extender/blob/master/README.md">readme</a> for information on how to install hooks.
    </p>
{/if}
{foreach from=$LV_HOOKS key=MODULE item=FILES}
    <h3>{$MODULE}</h3>
    <ul>
    {foreach from=$FILES item=FILE}
        <li>{$FILE}</li>
    {/foreach}
    </ul>
    {if !$FILES}
    {$MOD.LBL_LV_NO_MODULES}
    {/if}
{/foreach}