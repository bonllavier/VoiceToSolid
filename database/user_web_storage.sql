CREATE USER `web_storage`@`localhost` IDENTIFIED BY '1234' WITH mysql_native_password PASSWORD EXPIRE NEVER;

GRANT Select ON `voicetosolid`.* TO `web_storage`@`localhost`;

GRANT Select ON TABLE `voicetosolid`.`tbl_colors` TO `web_storage`@`localhost`;

GRANT Delete, Insert, Select, Update ON TABLE `voicetosolid`.`tbl_pieces` TO `web_storage`@`localhost`;

GRANT Delete, Insert, Select, Update ON TABLE `voicetosolid`.`tbl_projects` TO `web_storage`@`localhost`;

GRANT Select ON TABLE `voicetosolid`.`tbl_shapes` TO `web_storage`@`localhost`;

GRANT Delete, Insert, Select, Update ON TABLE `voicetosolid`.`tbl_users` TO `web_storage`@`localhost`;
