import BaseModel from "./base.model";

export default class ToolAreaModel extends BaseModel {
    name = null;

    enabled = true;

    // table details reactive property
    _showDetails = false;


}