<h2>{$MOD.LBL_LV_SECTION_HEADER} - {$MOD.LBL_LV_DEBUGGER}</h2>
{foreach from=$LV_HOOKS key=MODULE item=FILES}
    <h3>{$MODULE}</h3>
    <ul>
    {foreach from=$FILES item=$FILE}
        <li>{$FILE}</li>
    {/foreach}
    </ul>
{/foreach}