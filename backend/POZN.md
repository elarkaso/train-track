# Poznámka k odevzdání backendu

V této fázi je backend implementován v rozsahu požadovaném zadáním backendového úkolu, tj. jako datové úložiště a CRUD API pro obě hlavní datové entity navržené v Business Modelu:

- Workout
- Exercise

Součástí implementace je:
- databázový model v PostgreSQL
- Prisma schéma a migrace
- seed katalogu cviků
- kompletní CRUD endpointy pro Workout
- kompletní CRUD endpointy pro Exercise

Entita / vazební objekt `WorkoutExercise` je v datovém modelu již navržen a implementován na úrovni databázového schématu, protože je nutný pro správné zachycení vztahu mezi workoutem a exercise a pro uložení workout-specific parametrů (`sets`, `repetitions`, `usedWeight`).

Její aplikační logika a endpointy však budou dokončeny v následující fázi implementace, protože tato část již přesahuje minimální požadavek aktuálního backendového úkolu, který je zaměřen primárně na CRUD obou hlavních datových entit.

Stejně tak bude v další fázi doplněna i business funkcionalita `Training Balance Analysis`, která je součástí celkové aplikace, ale není nezbytná pro splnění základního zadání backendové realizace.

Backend je tedy v této chvíli připraven k odevzdání ve smyslu požadavků aktuálního zadání, zatímco rozšířená aplikační logika bude doplněna později, pro zachování stability aktuálního stavu, ve zvlášť vytvořené větvi.