# Docker Troubleshooting Report

## Problem 1
Symptom: `docker compose up --build` refused to start anything at all.
Command used: `docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken up --build`
Log or evidence: `service "frontend" depends on undefined service "api": invalid compose project`
Root cause: `frontend`'s `depends_on` block referenced a service named `api`, but no service by that name exists in the file — the backend service is actually named `backend`.
Fix: Changed `depends_on: api:` to `depends_on: backend:` in `compose.fixed.yml`.
Why the fix works: Compose validates the entire file before creating any containers, and `depends_on` must reference an exact service key defined elsewhere in the same file — that key doubles as the DNS name other services use to reach it on the shared network. There's no separate alias system; the map key *is* the identity.

## Problem 2
Symptom: after fixing Problem 1, the backend container would fail its health check and never reach a running state (verified by config review, since the app's real Mongo properties don't match what the broken file set).
Command used: read `application.properties` directly (`spring.mongodb.host=${MONGODB_HOST:localhost}`) and compared against `compose.broken.yml`'s backend environment block.
Log or evidence: `compose.broken.yml` set `SPRING_MONGODB_URI: mongodb://localhost:27017/asset_tracker_db`, but the app never reads a property called `spring.mongodb.uri` — it reads `spring.mongodb.host`, which defaults to `localhost` when `MONGODB_HOST` isn't set.
Root cause: two compounding issues — (1) the env var name was wrong for what the app actually consumes, and (2) even if it were consumed, `localhost` inside the `backend` container refers to the container itself, not the `mongo` service, so the connection would fail either way.
Fix: Set `MONGODB_HOST: mongo` (the real property source) instead of the unused `SPRING_MONGODB_URI`.
Why the fix works: Compose gives every service a DNS entry matching its service name on the network it creates automatically. `mongo` resolves to the actual MongoDB container's IP; `localhost` never would, since each container has its own isolated loopback interface.

## Problem 3
Symptom: after fixing Problems 1 and 2, the backend crashed on startup with a Spring bean creation failure instead of connecting.
Command used: `docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken logs backend`
Log or evidence: `Failed to instantiate [com.mongodb.client.MongoClient] ... Caused by: java.lang.IllegalArgumentException: No username is provided in the connection string`
Root cause: the `mongo` service had no authentication configured at all (no `MONGO_INITDB_ROOT_USERNAME`/`PASSWORD`), and the app's username/password properties default to empty strings when unset. Spring Boot's Mongo client builds an actual connection string from these properties, and a string with an empty/absent username segment is rejected outright by the driver — it doesn't fall back to "no credentials," it just fails.
Fix: Gave `mongo` real root credentials via `MONGO_INITDB_ROOT_USERNAME`/`MONGO_INITDB_ROOT_PASSWORD`, and set matching `MONGODB_USERNAME`/`MONGODB_PASSWORD`/`MONGODB_AUTH_DATABASE=admin` on the backend (root users created this way authenticate against the `admin` database).
Why the fix works: both sides of the connection now agree on a real, non-empty credential pair, so the driver can build a valid connection string and successfully authenticate.

## Bonus fixes (port collisions, found while actually running the stack)
- `MONGO_HOST_PORT` defaulted to `27017`, which collided with a MongoDB instance already running natively on this machine (used by other exercises). Changed default to `27019`.
- `BACKEND_PORT` defaulted to `8080`, which collided with an already-running `support-desk-api` container from a separate exercise. Changed default to `8081`.
- Confirmed via `docker ps` before and after that both stacks (`asset-tracker-*-lab` and `support-desk-*`) now run simultaneously without conflict.

## Final verification
- [x] Frontend loads (`asset-tracker-ui-lab` healthy on :5174)
- [x] Login page reachable (verified via container health + Nginx proxy test)
- [x] Backend health check works (`curl http://localhost:8081/api/health` → `{"status":"UP",...}`)
- [x] Backend readiness/health via the frontend Nginx proxy works (`curl http://localhost:5174/api/health` → identical response)
- [x] MongoDB container is running (`asset-tracker-mongo-lab` healthy)
- [x] Backend can connect to MongoDB (confirmed by health status UP and by direct `mongosh` queries succeeding)
- [x] Data can be reset with `down -v` (proved directly: inserted a marker document, `down` alone preserved it across a restart, `down -v` deleted the volume and the marker document was gone on the next `up`)
