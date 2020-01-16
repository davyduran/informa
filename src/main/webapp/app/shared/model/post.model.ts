import { Moment } from 'moment';
import { IArquivo } from 'app/shared/model/arquivo.model';
import { ILinkExterno } from 'app/shared/model/link-externo.model';

export interface IPost {
  id?: number;
  versao?: number;
  criacao?: Moment;
  ultimaEdicao?: Moment;
  conteudo?: string;
  oficial?: boolean;
  publicacao?: Moment;
  arquivos?: IArquivo[];
  linksExternos?: ILinkExterno[];
  autorId?: number;
  grupoId?: number;
  autorNome?: string;
  grupoNome?: string;
}

export class Post implements IPost {
  constructor(
    public id?: number,
    public versao?: number,
    public criacao?: Moment,
    public ultimaEdicao?: Moment,
    public conteudo?: string,
    public oficial?: boolean,
    public publicacao?: Moment,
    public arquivos?: IArquivo[],
    public linksExternos?: ILinkExterno[],
    public autorId?: number,
    public grupoId?: number
  ) {
    this.oficial = this.oficial || false;
  }
}
