-- CreateTable
CREATE TABLE "event_logs" (
    "id" UUID NOT NULL,
    "eventName" VARCHAR(100) NOT NULL,
    "eventData" JSON NOT NULL,

    CONSTRAINT "event_logs_pkey" PRIMARY KEY ("id")
);
