import BaseModel from "./base.model";
import UserModel from "./user.model";
import ResourceModel from "./resource.model";
import IssueEffect from "./issueeffect";
import store from "../store";

export default class IssueModel extends BaseModel {
  files = [];

  effect = {};

  projectedTemplates = [];

  timeValue = 0;

  get effect() {
    return this.effect;
  }

  set effect(value) {
    if (value) {
      this.effect = value;
    } else {
      this.effect = {};
    }
  }

  set activeTemplates(value) {
    if (value) {
      this.activeTemplates = value;
    } else {
      this.projectedTemplates = [];
    }
  }

  set projectedTemplates(value) {
    if (value) {
      this.projectedTemplates = value;
    } else {
      this.projectedTemplates = [];
    }
  }

  get projectedTemplates() {
    return this.projectedTemplates;
  }

  get issueActiveEffect() {
    return this.effect;
  }

  get hasFile() {
    return this.files && this.files.length > 0;
  }

  get file() {
    return this.files[0];
  }

  set file(value) {
    if (value) {
      this.files[0] = value;
    } else {
      delete this.files[0];
    }
  }

  get timeTotalValue() {
    let total = 0;
    if (this.timeValue !== 0) {
      let formattedCost = 0;
      if (this.author && this.author.formattedHourlyCosts) {
        formattedCost = this.author.formattedHourlyCosts;
        total -= Math.round(formattedCost * this.timeValue);
      }
    }
    return total;
  }

  get moneyTotalValue() {
    let total = 0;

    if (this.moneyValue !== 0) {
      total -= this.moneyValue;
    }
    return total;
  }

  get getHourlyCostsByRole() {
    let roleHourlyCosts = [];
    let rolesAverage = [];
    const roles = store.getters["companyRole/all"];
    roles.map(role => {
      if (role.users.length > 0) {
        role.users.map(user => {
          rolesAverage.push({
            companyRoleId: role.id,
            hourlyAverage: user.formattedHourlyCosts
          });
        });
      }
    });

    const keys = [...new Set(rolesAverage.map(x => x.companyRoleId))];

    keys.map(roleId => {
      const multiples = rolesAverage.filter(x => x.companyRoleId == roleId);
      const hourlyAverage =
        multiples.reduce((total, user) => total + user.hourlyAverage, 0) /
        multiples.length;

      roleHourlyCosts.push({ roleId, hourlyAverage });
    });

    return roleHourlyCosts;
  }

  get issueHoursTotal() {
    let totalTime = 0;
    if (this.timeValue) {
      totalTime += this.timeValue * 0.01;
    }

    const effect = this.effect;

    if (effect && effect.templates && effect.templates.length > 0) {
      effect.templates.forEach(template => {
        const time = template.effectTime * 0.01;
        const mod = this.timeValue * 0.01;
        totalTime += time * mod;
      });
    }
    return totalTime;
  }

  get effectedMoneyTotalValue() {
    let total = 0;
    if (this.moneyTotalValue) {
      total -= this.moneyTotalValue;
    }

    if (this.timeTotalValue) {
      total -= this.timeTotalValue;
    }

    const active = this.effect;
    if (active) {
      total -= active.effectValue;
      if (active.templates && active.templates.length > 0) {
        active.templates.forEach(template => {
          const companyRoleId = template.companyRoleId;
          const effectTime = template.effectTime;

          //money value
          total -= template.effectValue;

          //time value
          const hourlyByRole = this.getHourlyCostsByRole.find(
            r => r.roleId == companyRoleId
          );


          if (hourlyByRole && hourlyByRole.hourlyAverage) {
            total -= hourlyByRole.hourlyAverage * effectTime;
          }
        });
      }
    }

    return total;
  }

  get stageId() {
    return this.parentStructure.stageId;
  }

  set stageId(value) {
    this.parentStructure.stageId = value;
  }

  get operationId() {
    return this.parentStructure.operationId;
  }

  set operationId(value) {
    this.parentStructure.operationId = value;
  }

  get phaseId() {
    return this.parentStructure.phaseId;
  }

  set phaseId(value) {
    this.parentStructure.phaseId = value;
  }

  get parentStructure() {
    if (!this._parentStructure) {
      this._parentStructure = {};
      this._parentStructure.processId = this.processId;
      if (this.parent) {
        if (this.parent.__typename === "ProcessPhase") {
          this._parentStructure.stageId = this.parent.operation.stageId;
          this._parentStructure.operationId = this.parent.operation.id;
          this._parentStructure.phaseId = this.parent.id;
        } else if (this.parent.__typename === "ProcessOperation") {
          this._parentStructure.stageId = this.parent.stageId;
          this._parentStructure.operationId = this.parent.id;
        } else {
          this._parentStructure.stageId = this.parent.id;
        }
      }
    }
    return this._parentStructure;
  }

  deserialize(input) {
    if (input) {
      if (input.author) {
        input.author = new UserModel().deserialize(input.author);
      }

      if (input.files) {
        input.files = input.files.map(f => {
          return new ResourceModel().deserialize(f);
        });
      }

      if (input.effect) {
        input.effect = new IssueEffect().deserialize(input.effect);
      }
    }

    Object.assign(this, input);
    return this;
  }
}
