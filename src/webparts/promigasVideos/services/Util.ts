export default class Util {

    public static GetIdVideoYoutube(url: string): string {
        const regExp: RegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match: RegExpMatchArray = url.match(regExp);
        return (match && match[2].length === 11)
            ? match[2]
            : undefined;
    }

   
    public static TransformarVideoEmbedido(url: string): string {
        const videoId: string = this.GetIdVideoYoutube(url);
        return 'https://www.youtube.com/embed/' + videoId;
    }

    public static validateTitle(value: string): string {   //Valida el campo por nulo o tamaño de caracteres
    
        if (value === null ||
          value.trim().length === 0) {
          return 'Este campo requiere información';
        }
       if (value.length > 100) {
          return 'Este campo no puede exceder los 100 caracteres';
        }
          return '';
      }

      public static renderSwitch(param,esp,ing) {    //Método para validar el localstorage del idioma, y presentar los campos configurados en la webpart, recibe los props del sistema
        switch(param) {
            case 'ESP':
            return esp;
            case 'ENG':
            return ing;
          default:
            return esp;
        }
      }

}