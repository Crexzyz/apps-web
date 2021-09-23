function verify(control, max, progressText) {
    let characters = control.value.length;
    let charsLeft = max - characters;

    let minHeight = 200;
    control.style.height = "";
    control.style.height = Math.min(control.scrollHeight, minHeight) + "px";

    if(charsLeft <= 0) {
        let trimmedText = control.value.substring(0, 300);
        control.value = trimmedText;
        charsLeft = 0;
    }

    let plural = charsLeft == 1 ? "caracter" : "caracteres";
    progressText.innerHTML = `Usted tiene un espacio de ${charsLeft} ${plural} restantes`;
}