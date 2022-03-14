
SELECT public."User"."date", public."Cadastre"."url", public."Image"."pathImg", 
public."Image"."gpsLatitude", public."Image"."gpsLongitude", public."Image"."absoluteAltitude",
public."Image"."gimballYawDegree"
FROM public."User" 
INNER JOIN public."Cadastre" ON public."User"."idUser" = public."Cadastre"."idOwner" 
INNER JOIN public."Image" ON public."Cadastre"."idCadastre" = public."Image"."idCad" 