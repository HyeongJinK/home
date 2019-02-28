exports.sql = {
    findByAll : `
    SELECT
        ta.idx as idx
        , ta.title
        , ta.start_time
        , ta.finish_time
        , pr.title as projectName
        , ty.name as typeName
        , st.name as statusName
        , pri.name as priorityName
        , ta.manager
        , ta.progress
        , ve.title as versionName
    FROM
        task as ta
    left join project as pr
        on ta.projectIdx = pr.idx
    left join type as ty
        on ta.type = ty.idx
    left join status as st
        on ta.status = st.idx
    left join priority as pri
        on ta.priority = pri.idx
    left join version as ve
        on ta.versionIdx = ve.idx
    ORDER BY idx DESC
    LIMIT ?, ?
    `
    , findByIdx: `
        SELECT
            *
        FROM
            task
        WHERE
            idx = ?`
    , count: `
        SELECT
            count(*) as total
        FROM
            task`
    , save: `
        INSERT INTO task 
            (parentIdx, projectIdx, title, description, type, status, start_time, finish_time, priority, manager, progress, versionIdx, create_date)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,datetime('now','localtime'))`
    , update: `
        UPDATE
            task 
        SET 
            parentIdx = ?
            , projectIdx = ?
            , title = ?
            , description = ?
            , type = ?
            , status = ?
            , start_time = ?
            , finish_time = ?
            , priority = ?
            , manager = ?
            , progress = ?
            , versionIdx = ?
        WHERE
            idx = ?`
    , delete: `
        DELETE FROM 
            task 
        WHERE 
            idx = ?`
}