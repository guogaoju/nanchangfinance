DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `start_rank_one`(in p_uid int)
BEGIN

    declare p_year int;
    declare p_quarter int;
    declare p_time timestamp;

    declare p_new_year int;
    declare p_new_quarter int;

    if exists(select * from t_scf_supplierinfo where c_uid = p_uid and c_status=1313)
    then
    -- handle here
    -- 曾经评级过！
    if exists(select * from t_scf_rank where c_uid=p_uid)
    then
        -- 如果有存在超过90天还没有评级的
        if exists(select * from t_scf_rank where c_uid=p_uid and (to_days(now())-to_days(c_time))>90)
        then
            select c_year,c_quarter,c_time into p_year,p_quarter,p_time from t_scf_rank where c_uid=p_uid;
            if p_quarter = 1337
            then
                set p_new_quarter = 1334;
            elseif p_quarter = 1336
            then
                set p_new_quarter = 1337;
            elseif p_quarter = 1335
            then
                set p_new_quarter = 1336;
            elseif p_quarter = 1334
            then
                set p_new_quarter = 1335;
            end if;
            -- 获得年份，这里需要反查一下
            if p_quarter = 1337
            then
                set p_new_quarter = p_quarter + 1;
            else
                set p_new_quarter = p_quarter;
            end if;

            insert into t_scf_rank(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
            insert into t_scf_xianjinliuliangbiao(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
            insert into t_scf_zichanfuzhai(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
            insert into t_scf_lirunbiao(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
            insert into t_scf_biaowaishuju(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
            insert into t_scf_dingxingbiao(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
        end if;
    else
    -- 从来没有评级过！
        select year(now()) into p_year;
        select quarter(now()) into p_quarter;

        select id into p_new_year from t_code where c_name = p_year;
        if p_quarter = 4
        then
            set p_new_quarter = 1337;
        elseif p_quarter = 3
        then
            set p_new_quarter = 1336;
        elseif p_quarter = 2
        then
            set p_new_quarter = 1335;
        elseif p_quarter = 1
        then
            set p_new_quarter = 1334;
        end if;

        insert into t_scf_rank(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
        insert into t_scf_xianjinliuliangbiao(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
        insert into t_scf_zichanfuzhai(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
        insert into t_scf_lirunbiao(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
        insert into t_scf_biaowaishuju(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
        insert into t_scf_dingxingbiao(c_uid,c_year,c_quarter) values(p_uid,p_new_year,p_new_quarter);
    end if;
    end if;

END;;
DELIMITER ;