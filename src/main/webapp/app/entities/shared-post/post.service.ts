import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPost } from 'app/shared/model/post.interface';
import { IEntity } from 'app/shared/model/entity.model';
import {LinkExternoService} from 'app/entities/link-externo/link-externo.service';
import {ArquivoService} from 'app/entities/arquivo/arquivo.service';
import { IGrupo } from 'app/shared/model/grupo.interface';

type EntityResponseType = HttpResponse<IPost>;
type EntityArrayResponseType = HttpResponse<IPost[]>;

@Injectable({ providedIn: 'root' })
export class PostService {
  public resourceUrl = SERVER_API_URL + 'api/posts';

  constructor(protected http: HttpClient,
              protected linkExternoService: LinkExternoService,
              protected arquivoService: ArquivoService) {}

  create(post: IPost): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(post);
    return this.http
      .post<IPost>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(post: IPost): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(post);
    return this.http
      .put<IPost>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  publica(post: IPost): Observable<EntityResponseType> {
    const copy = this.convertPostToEntity(post);
    return this.http
      .put<IEntity>(`${this.resourceUrl}-publica`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPost>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPost[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryLoggedUser(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPost[]>(`${this.resourceUrl}-user`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryFiltro(filtro: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPost[]>(`${this.resourceUrl}${filtro}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryGrupo(grupoId: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPost[]>(`${this.resourceUrl}-grupo/${grupoId}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }


  loadAll(page: number, size: number, predicate: string, filtro: string, grupo?: IGrupo ): Observable<EntityArrayResponseType> {
    if (grupo != null && grupo !== undefined) {
      return this.queryGrupo(grupo.id!,{ page, size, sort: [predicate + ',desc', 'id,asc']});
    } else {
      return this.queryFiltro(filtro, { page, size, sort: [predicate + ',desc', 'id,asc']});
    }
  }

  countDrafts(req?: any): Observable<number> {
    const options = createRequestOption(req);
    return this.http
    .get<number>(`${this.resourceUrl}-user-count`, { params: options, observe: 'response' })
    .pipe(map((res: HttpResponse<number>) => (res.body) ? res.body : 0));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertPostToEntity(post: IPost): IEntity {
    const entity: IEntity = {
      id: post.id,
      versao: post.versao
    };
    return entity;
  }

  protected convertDateFromClient(post: IPost): IPost {
    const copy: IPost = Object.assign({}, post, {
      criacao: post.criacao && post.criacao.isValid() ? post.criacao.toJSON() : undefined,
      ultimaEdicao: post.ultimaEdicao && post.ultimaEdicao.isValid() ? post.ultimaEdicao.toJSON() : undefined,
      publicacao: post.publicacao && post.publicacao.isValid() ? post.publicacao.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.criacao = res.body.criacao ? moment(res.body.criacao) : undefined;
      res.body.ultimaEdicao = res.body.ultimaEdicao ? moment(res.body.ultimaEdicao) : undefined;
      res.body.publicacao = res.body.publicacao ? moment(res.body.publicacao) : undefined;
      res.body.linksExternos!.forEach((link) => this.linkExternoService.convertDateFromServerLinkExterno(link));
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((post: IPost) => {
        post.criacao = post.criacao ? moment(post.criacao) : undefined;
        post.ultimaEdicao = post.ultimaEdicao ? moment(post.ultimaEdicao) : undefined;
        post.publicacao = post.publicacao ? moment(post.publicacao) : undefined;
        post.linksExternos!.forEach((link) => this.linkExternoService.convertDateFromServerLinkExterno(link));
      });
    }
    return res;
  }
}
