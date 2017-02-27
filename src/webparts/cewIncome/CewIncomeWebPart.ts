import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import {SPHttpClient, SPHttpClientConfigurations} from '@microsoft/sp-http';

import styles from './CewIncome.module.scss';

import * as strings from 'cewIncomeStrings';
import { ICewIncomeWebPartProps } from './ICewIncomeWebPartProps';

// Angular 2
import 'reflect-metadata';
import 'hammerjs';

require('zone.js');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';


export default class CewIncomeWebPart extends BaseClientSideWebPart<ICewIncomeWebPartProps> {

  private _renderListAsync(): void {
    
      //this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists(guid'"+this.properties.listId+"')/items", SPHttpClient.configurations.v1)
    //.then((response: Response) => {
          //debugger;
      //    var s = response.json();
          //ModelTest.getContext(this.context.pageContext.web.absoluteUrl);
          this._renderList();
        //  });
  }

  private _renderList(): void {
      
      this.domElement.innerHTML = `<my-app></my-app>`;
      platformBrowserDynamic().bootstrapModule(AppModule);
      
  }

  public render(): void {
    this._renderListAsync();
    
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
    
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
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('ListTitle', {
                  label: "List Title"
                }),
                PropertyPaneTextField('SiteUrl', {
                  label: "URL to the SP site"
                })
                
              ]
            }
          ]
        }
      ]
    };
  }
}
