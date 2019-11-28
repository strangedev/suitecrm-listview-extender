<h2>{$MOD.LBL_LV_SECTION_HEADER} - {$MOD.LBL_LV_DEBUGGER}</h2>
{foreach from=$LV_HOOKS item=MODULE}
    <h3>{$MODULE}</h3>
    <ul>
    {foreach from=$MODULE item=$FILE}
        <li>{$FILE}</li>
    {/foreach}
    </ul>
{/foreach}