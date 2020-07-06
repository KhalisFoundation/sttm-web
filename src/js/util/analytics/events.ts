interface IEventArguments {
  category?: string,
  action: string,
  label: string
}

export const CATEGORIES = {
  CLICK: 'click',
  ERROR: 'error',
};

// Basic event
export const event = ({ category = '-', action = '-', label = '-' }: IEventArguments) =>
  requestAnimationFrame(() =>
    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    })
  );

//Sets category as click
export const clickEvent = ({ action, label }: IEventArguments) =>
  event({ category: CATEGORIES.CLICK, action, label });

//Sets category as error
export const errorEvent = ({ action, label }: IEventArguments) =>
  event({ category: CATEGORIES.ERROR, action, label });
