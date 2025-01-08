import { UsersInterface } from "./UsersInterface";

export interface AreaInterface {
    ID?: number;
    AreaName?: string;   
	Floor?: number;
}

export interface CleaningRecordInterface {
    ID?: number;
    ActualStartTime?: Date;
    ActualEndTime?: Date;
    Notes?: string;
    ScheduleID?: number;
    User ?: UsersInterface;
    UserID?: number;
    AreaID?: number;
}

export interface SchedulesInterface {
    TaskName: string;
    ID?: number;
    StartTime?: Date;
    EndTime?: Date;
    AreaID?: number;
}