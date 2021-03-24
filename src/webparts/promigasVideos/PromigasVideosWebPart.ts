import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './PromigasVideosWebPart.module.scss';
import * as strings from 'PromigasVideosWebPartStrings';
import VideoHtml from '../promigasVideos/services/VideoHtml';
import Util from '../promigasVideos/services/Util';

export interface IPromigasVideosWebPartProps {
  description: string;
  tituloIngles: string;
  UrlIngles:string;
}

export default class PromigasVideosWebPart extends BaseClientSideWebPart<IPromigasVideosWebPartProps> {

  public render(): void {
    const propiedades: IPromigasVideosWebPartProps = this.properties;
    VideoHtml.ObtenerVideo(propiedades)
    this.domElement.innerHTML = VideoHtml.templateHtml;
  }



  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Título',
                  onGetErrorMessage: Util.validateTitle.bind(this),
                }),
                PropertyPaneTextField('tituloIngles', {
                  label: 'Título Ingles',
                  onGetErrorMessage: Util.validateTitle.bind(this),
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
