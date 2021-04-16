interface IToMultipleShabadsUrlArguments {
  shabadIds: number[]
}

export const toMultipleShabadsURL = ({
  shabadIds,  
}: IToMultipleShabadsUrlArguments) =>
  `/shabad?id=${shabadIds.join(',')}`;
