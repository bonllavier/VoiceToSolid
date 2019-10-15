#create user web_storage with the following privileges:
#tables tbl_colors and tbl_shapes: select only
#tables tbl_users, tbl_project and tbl_pieces: select, update, delete and insert

CREATE USER `web_storage`@`localhost` IDENTIFIED WITH mysql_native_password BY '1234' PASSWORD EXPIRE NEVER;

GRANT Select ON `voicetosolid`.* TO `web_storage`@`localhost`;

GRANT Select ON TABLE `voicetosolid`.`tbl_colors` TO `web_storage`@`localhost`;

GRANT Delete, Insert, Select, Update ON TABLE `voicetosolid`.`tbl_pieces` TO `web_storage`@`localhost`;

GRANT Delete, Insert, Select, Update ON TABLE `voicetosolid`.`tbl_projects` TO `web_storage`@`localhost`;

GRANT Select ON TABLE `voicetosolid`.`tbl_shapes` TO `web_storage`@`localhost`;

GRANT Delete, Insert, Select, Update ON TABLE `voicetosolid`.`tbl_users` TO `web_storage`@`localhost`;
