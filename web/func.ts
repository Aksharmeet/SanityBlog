import moment from "moment"

export const ConvertToDate = (UTCDate) => {
    return moment?.(new Date(UTCDate)).format('DD MMMM, yyyy')
}

