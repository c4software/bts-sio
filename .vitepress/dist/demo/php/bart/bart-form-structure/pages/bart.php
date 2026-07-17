<?php
$count = 0;
?>
<div class="tableau">
    <?php
    while ($count < $_POST['count']) {
        echo $_POST['phrase'] . '<br />';
        $count++;
    }
    ?>
</div>