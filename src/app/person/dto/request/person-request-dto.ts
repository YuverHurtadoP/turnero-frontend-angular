import { UserRequestDto } from "src/app/access/dto/request/user-request-dto";

export class PersonRequestDto {
  name: string = "";
  lastName: string = "";
  nroDni:  string =  "";
  phoneNumber : string = "";
  municipalityId: number = 0;
  documentTypeId: number = 0;
  userRequestDto: UserRequestDto = new UserRequestDto;
}
