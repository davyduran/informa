import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PerfilGrupo } from 'app/shared/model/perfil-grupo.model';

import { PerfilGrupoService } from './perfil-grupo.service';
import { PerfilGrupoDeleteDialogComponent } from './perfil-grupo-delete-dialog.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PerfilGrupoViewService } from 'app/layouts/navbar/perfil-grupo-view.service';
import { IGrupo } from 'app/shared/model/grupo.interface';
import { IPerfilGrupo } from 'app/shared/model/perfil-grupo.interface';
import { ITopico } from 'app/shared/model/topico.model';

@Component({
  selector: 'jhi-perfil-grupo',
  templateUrl: './perfil-grupo.component.html',
  styleUrls: [ './perfil-grupo.component.scss']
})
export class PerfilGrupoComponent implements OnInit, OnDestroy, AfterViewInit {
  perfilGrupos: IPerfilGrupo[];
  eventSubscriber?: Subscription;
  predicate: string;
  ascending: boolean;
  isSaving = false;
  filtro = new FormControl();
  filtroValue = '';
  topicoFiltro?: ITopico;

  constructor(
    protected perfilGrupoService: PerfilGrupoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected perfilGrupoViewService: PerfilGrupoViewService,
  ) {
    this.perfilGrupos = [];
    this.predicate = 'id';
    this.ascending = true;
    this.filtro.valueChanges
      .pipe(debounceTime(200))
      .subscribe(val => {
        this.filtroValue = val;
      });

  }

  filtroMachTexto(grupo: IGrupo): boolean {
    if (this.filtroValue === '') return true;
    const textao = grupo.nome + ' ' + (grupo.descricao ? grupo.descricao.toLocaleLowerCase() : ' ');
    return RegExp(this.filtroValue).exec(textao) !== null;
  }

  filtroMatchTopico (grupo: IGrupo): boolean {
    if (this.topicoFiltro === undefined) return true;
    const topicoEncontrado = grupo.topicos!.find(topico => topico.id === this.topicoFiltro!.id);
    // eslint-disable-next-line no-console
    console.log(topicoEncontrado);
    return topicoEncontrado !== undefined;
  }
  filtroMatch(grupo: IGrupo): boolean {
    return this.filtroMachTexto(grupo) && this.filtroMatchTopico(grupo);
  }

  topicoSelecionado(topico: ITopico): void {
    // eslint-disable-next-line no-console
    console.log(topico);
    this.topicoFiltro = topico;
  }

  loadAll(): void {
    this.perfilGrupoService
      .queryManagement()
      .subscribe((res: HttpResponse<IPerfilGrupo[]>) => this.perfilGrupos = this.perfilGrupoService.perfisOrdenados(res.body ? res.body : []));
  }

  reset(): void {
    this.perfilGrupos = [];
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPerfilGrupos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return index;
  }

  registerChangeInPerfilGrupos(): void {
    this.eventSubscriber = this.eventManager.subscribe('perfilGrupoListModification', () => this.reset());
  }

  delete(perfilGrupo: IPerfilGrupo): void {
    const modalRef = this.modalService.open(PerfilGrupoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.perfilGrupo = perfilGrupo;
  }

  entra(perfilGrupo: IPerfilGrupo): void {
      this.perfilGrupoService.create(perfilGrupo).subscribe(
        (res) => this.onSaveSuccess(res.body!),
        () => this.onSaveError()
      );
  }

  sai(perfilGrupo: IPerfilGrupo): void {
    if (perfilGrupo.id === undefined) return;
    this.perfilGrupoService.delete(perfilGrupo.id).subscribe(
      () => this.onDeleteSuccess(perfilGrupo.grupo!),
      () => this.onSaveError()
    );
  }

  protected onDeleteSuccess(grupo: IGrupo): void {
    const index = this.perfilGrupos.findIndex((each) => each.grupo!.id === grupo.id);
    const novoPerfilGrupo = new PerfilGrupo();
    novoPerfilGrupo.grupo = grupo;
    this.perfilGrupos[index] =  novoPerfilGrupo;
    this.isSaving = false;
    this.eventManager.broadcast('perfilGrupoListModification');
  }

  protected onSaveSuccess(perfilGrupo: IPerfilGrupo): void {
    const index = this.perfilGrupos.findIndex((each) => each.grupo!.id === perfilGrupo.grupo!.id);
    this.perfilGrupos[index] = perfilGrupo;
    this.isSaving = false;
    this.eventManager.broadcast('perfilGrupoListModification');
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  ngAfterViewInit(): void {
    this.perfilGrupoViewService.navega("assinaturas");
  }

}
