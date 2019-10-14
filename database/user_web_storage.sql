# Create web storage user and give privileges on tables:
# tbl_colors: select
# tbl_shapes: select
# tbl_users: select, update, delete and insert
# tbl_projects: select, update, delete and insert
# tbl_pieces: select, update, delete and insert

CREATE USER `web_storage`@`localhost` IDENTIFIED WITH caching_sha2_password PASSWORD EXPIRE NEVER;

GRANT Select ON `voicetosolid`.* TO `web_storage`@`localhost`;

GRANT Select ON TABLE `voicetosolid`.`tbl_colors` TO `web_storage`@`localhost`;

GRANT Delete, Insert, Select, Update ON TABLE `voicetosolid`.`tbl_pieces` TO `web_storage`@`localhost`;

GRANT Delete, Insert, Select, Update ON TABLE `voicetosolid`.`tbl_projects` TO `web_storage`@`localhost`;

GRANT Select ON TABLE `voicetosolid`.`tbl_shapes` TO `web_storage`@`localhost`;

GRANT Delete, Insert, Select, Update ON TABLE `voicetosolid`.`tbl_users` TO `web_storage`@`localhost`;
