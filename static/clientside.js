$(document).ready(function() {
    const $valueSpan = $('.valueSpan1');
    const $value = $('#customRange1');
    $valueSpan.html($value.val());
    $value.on('input change', () => {
        $valueSpan.html($value.val());
    });
});