<?php

namespace App\Validators;

use App\Lib\Validators\GenericValidator;
use App\Models\CompanyTool;
use App\Models\Process;
use App\Models\ProcessOperation;
use App\Models\ProcessPhase;
use App\Models\ProcessStage;
use App\Validators\Rules\ExistsInCompanyRule;
use App\Validators\Rules\UniqueInCompanyRule;
use Illuminate\Validation\Rule;

class CompanyToolValidator extends GenericValidator
{
    public function __construct($data = [], $entity = null, $action = '', $messages = [])
    {
        $col = collect($data);
        $rules = [
            'name' => 'required',
            'tool_id' => ['nullable', new UniqueInCompanyRule(CompanyTool::query(), $entity ? ['id' => $entity->id] : null)],
            'company_tool_id' => ['nullable', new ExistsInCompanyRule(CompanyTool::query())],
            'yearly_costs' => ['nullable', 'integer', 'min:1'],
            'price_model' => ['nullable', 'string'],
        ];
        parent::__construct($rules, $data, $entity, $action, $messages);
    }
}
