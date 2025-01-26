export interface UsersInterface {
    ID?: 					number;
    UserName?:  			string;
	Password?:     			string;
	Email?:     			string;
	Profile?: 				string;
	ProfileBackground?: 	string;
	FirstName?: 			string;
	LastName?: 				string;
	Age?: 					number;
	Tel?: 					string;
	Status?: 				string;
}
export interface MessageBoardInterface {
    ID?: 				number;
	PicNews?: 			string;
	TextHeader?: 		string;
	DescribtionNews?: 	string;
	UserID?:			number;
}
export interface EventInterface {
    ID?: 				number;
	event_pic?: 		string;
	event_topic?: 		string;
	event_description?: string;
	event_date?: 		Date;

	User?: 				UsersInterface;
	UserID?:			number;
}