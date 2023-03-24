-- Grant access for codereview_data user
GRANT USAGE ON SCHEMA public TO codereview_data;
GRANT SELECT ON "Report" to codereview_data;
GRANT SELECT ON "Repository" to codereview_data;
GRANT SELECT ON "Topic" to codereview_data;
GRANT SELECT ON "ProgrammingLanguage" to codereview_data;
