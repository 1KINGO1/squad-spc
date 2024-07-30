import { IsNotEmpty } from "class-validator";

class UpdateConfigDto {
  @IsNotEmpty()
  value: any;
}

export default UpdateConfigDto;