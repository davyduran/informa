import { Moment } from 'moment';
import { IArquivo } from 'app/shared/model/arquivo.model';
import { ILinkExterno } from 'app/shared/model/link-externo.model';

export interface IMensagem {
  id?: number;
  versao?: number;
  criacao?: Moment;
  ultimaEdicao?: Moment;
  conteudo?: string;
  temConversa?: boolean;
  arquivos?: IArquivo[];
  linksExternos?: ILinkExterno[];
  autorId?: number;
  postId?: number;
  conversaId?: number;
  autorNome?: string;
}

export class Mensagem implements IMensagem {
  constructor(
    public id?: number,
    public versao?: number,
    public criacao?: Moment,
    public ultimaEdicao?: Moment,
    public conteudo?: string,
    public temConversa?: boolean,
    public arquivos?: IArquivo[],
    public linksExternos?: ILinkExterno[],
    public autorId?: number,
    public postId?: number,
    public conversaId?: number,
    public autorNome?: string,
  ) {
    this.temConversa = this.temConversa || false;
  }
}
