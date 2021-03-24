import { sp, Web } from 'sp-pnp-js';
import { IPromigasVideosWebPartProps } from '../PromigasVideosWebPart';
import { IListItem } from '../interfaces/IListItem';
import Util from '../services/Util';
import styles from '../PromigasVideosWebPart.module.scss';

export default class VideoHtml {

    public static templateHtml: string =
        `<section class="mb-5 my-5">
            <div class="container" id="contenedor_video">
            </div>
         </section>`;

    public static ObtenerVideo(props: IPromigasVideosWebPartProps): void {
        VideoHtml.ObtenerVideosSharepoint().then((response) => {
        VideoHtml.RenderizarVideo(response, props);
        }).catch(e => console.error('Error al ejecutar ObtenerSharepoint', e));
    }

    private static async ObtenerVideosSharepoint(): Promise<IListItem[]> {
        try {
            const estado: string = '1';
            const filterString: string = `Estado eq '${estado}'`;
            const rootweb: Web = sp.site.rootWeb;
            const response: IListItem[] = await rootweb.lists.getByTitle('VideosHome')
                .items
                .filter(filterString)
                .select('Title,Url,Estado,descripcion,TituloIngles,descripcionIngles,UrlIngles')
                .top(1)
                .orderBy('Created', true)
             .get();
            return response;

        } catch (ex) {
            console.error(ex);
        }
    }

   
    private static RenderizarVideo(items: IListItem[], props: IPromigasVideosWebPartProps): void {
        const video: IListItem = items[0]; 
       
        try {
            const contenedorHtml: string = `<div class=row><div class="col-md-7 col-12">
        <div class="row">
                <div class="col-md-7 col-12">
                    <h2 class="${ styles.videotitle }">`+Util.renderSwitch(localStorage.getItem('promigasLenguajeActual'),props.description,props.tituloIngles)+`</h2>
                </div>
                     <div class="col-12 contenedor-nota-actualidad">
                        <div class="embed-responsive embed-responsive-16by9">
                        <iframe width="560" height="315" src=`+Util.TransformarVideoEmbedido(Util.renderSwitch(localStorage.getItem('promigasLenguajeActual'),video.Url['Url'],video.UrlIngles['Url']))+` frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                       </div>
                        <a href="" alt="Link a nota de actualidad">
                        <h3 class="${ styles.title }">`+Util.renderSwitch(localStorage.getItem('promigasLenguajeActual'),video.Title,video.TituloIngles)+`</h3>
                        <p>`+Util.renderSwitch(localStorage.getItem('promigasLenguajeActual'),video.descripcion,video.descripcionIngles)+`</p>
                    </a>
                 </div>
              </div>
           </div>
        </div>`;

       document.getElementById('contenedor_video').innerHTML+= contenedorHtml

        } catch (ex) {
            console.error(ex);
        }
    }
}
