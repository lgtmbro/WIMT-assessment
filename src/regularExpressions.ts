export const routeIdentifier = /route_[a-zA-Z0-9-_]+/gm;
export const referenceDataAgency = /(?<=(route_[a-zA-Z0-9-_]*\s))[A-Z]+/gm;
export const referenceDataRouteName = /(?<=\;).+/gm;
export const scoresDataDate = /\d{4}\/\d{2}\/\d{2}/gm;
export const scoresDataScore = /(?<=(route_[a-zA-Z0-9-_]+\s))\d{1,2}/gm;
