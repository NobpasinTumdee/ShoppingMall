import { UsersInterface } from "./UsersInterface";

export interface AreaInterface {
    ID?: number;
    AreaName?: string;   
	Floor?: number;
}

export interface CleaningRecordInterface {
    ID?: number;
    ActualStartTime?: string;
    ActualEndTime?: string;
    Notes?: string;
    ScheduleID?: number;
    User ?: UsersInterface;
    UserID?: number;
    AreaID?: number;
}

export interface SchedulesInterface {
    TaskName: string;
    ID?: number;
    StartTime?: string;
    EndTime?: string;
    AreaID?: number;
}