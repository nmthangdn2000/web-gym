$(document).ready(() => {
    for (let i = 1; i <= 31; i++) {
        $('#day').append('<option value="' + i + '">' + i + '</option>')
    }
    for (let i = 1; i <= 12; i++) {
        $('#month').append('<option value="' + i + '">' + i + '</option>')
    }
    for (let i = 0; i < 65; i++) {
        $('#year').append('<option value="' + (2021 - i) + '">' + (2021 - i) + '</option>')
    }
})