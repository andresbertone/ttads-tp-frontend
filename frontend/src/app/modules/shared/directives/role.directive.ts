import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

import { StorageService } from 'src/app/core/services/common/storage.service';

import { UserModel } from 'src/app/core/models/user/user.model';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {

  currentUser!: UserModel;
  appPermissions: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    const user = this.storageService.get('user');

    if (user) {
      this.currentUser = JSON.parse(user);
      this.updateView();
    }
  }

  @Input()
  set appRole(permissions: string[]) {
    this.appPermissions = permissions;
    this.updateView();
  }

  updateView() {
    this.viewContainer.clear();
    if (this.checkPermissions()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  checkPermissions(): boolean {
    let userHasPermission = false;

    if (this.currentUser && this.currentUser.role && this.currentUser.role.roleDescription) {
      userHasPermission = this.appPermissions.includes(this.currentUser.role.roleDescription);
    }

    return userHasPermission;
  }
}