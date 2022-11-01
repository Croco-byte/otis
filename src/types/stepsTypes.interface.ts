export interface BasicInfoData
{
    theme: string;
    genre: string;
    type: string;
    goal: string;
}

export interface DraftBasicData
{
    orderChecked: boolean;
    author: string;
    work: string;
    text: string;
    issue: string;
}

export interface DraftPlanElementsData
{
    elements: [ { id: number, data: string } ]
}

export interface DraftPlanData
{
    uncategorized: [];
    part_one: { title: string, elements: { uncategorized: [], s1: [], s2: [], s3: [] } };
    part_two: { title: string, elements: { uncategorized: [], s1: [], s2: [], s3: [] } };
    part_three: { title: string, elements: { uncategorized: [], s1: [], s2: [], s3: [] } };
}
