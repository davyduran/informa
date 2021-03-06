import { Moment } from 'moment';
import {IArquivo} from 'app/shared/model/arquivo.model';
import {ILinkExterno} from 'app/shared/model/link-externo.model';

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
  numeroDeMensagens?: number;
  autorNome?: string;
  autorEmail?: string;
  grupoNome?: string;
}
