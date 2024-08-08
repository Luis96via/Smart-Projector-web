document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("modal-WS-PREGUNTAS");
    var btns = document.querySelectorAll(".comprarBtnn"); // Selecciona todos los botones con la clase comprarBtnn
    var span = document.getElementsByClassName("close-ws-PREGUNTAS")[0];
    btns.forEach(function(btn) {
        btn.onclick = function() {
            modal.style.display = "block";
        }
    });
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});